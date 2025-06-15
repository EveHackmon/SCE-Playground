import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import api from '../services/api';
import { handleMainImageChange, handlePdfUpload } from '../utils/fileHandlers';
import { uploadFiles } from '../utils/uploadFiles';
import { useNavigate, useParams } from 'react-router-dom';

function AddProductForm({
  onProductAdded,
  handleClose,
  initialData = null,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image_url: '',
    datasheet_url: '',
    extra_images: [],
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const mainImageInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editHandleClose = () => {
    navigate(`/products/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? value.replace(/[^0-9.]/g, '') : value,
    }));
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setUploading(true);

    try {
      const {
        name,
        category,
        description,
        price,
        image_url,
        datasheet_url,
        extra_images,
      } = formData;

      const parsedPrice = parseFloat(price);
      if (
        !name.trim() ||
        !category.trim() ||
        !description.trim() ||
        isNaN(parsedPrice) ||
        parsedPrice <= 0 ||
        !image_url ||
        !datasheet_url ||
        extra_images.length === 0
      ) {
        setError(
          'Please fill in all fields. The price must be a positive number.'
        );
        setUploading(false);
        return;
      }

      const fullProduct = {
        ...formData,
        price: parsedPrice,
        extra_images: extra_images.map((f) => f.url),
      };

      if (onSubmit) {
        await onSubmit(fullProduct);
        setSuccess('Product updated successfully.');
      } else {
        const response = await api.post(
          '/products/create-product',
          fullProduct
        );
        setSuccess(`Product "${response.data.name}" was created successfully.`);
        if (onProductAdded) onProductAdded();
      }

      if (!onSubmit) {
        setFormData({
          name: '',
          category: '',
          description: '',
          price: '',
          image_url: '',
          datasheet_url: '',
          extra_images: [],
        });
        if (mainImageInputRef.current) mainImageInputRef.current.value = null;
        if (pdfInputRef.current) pdfInputRef.current.value = null;
      }

      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting the form.');
    } finally {
      setUploading(false);
    }
  };

  const handleExtraImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    console.log('extra images selected:', files);
    setUploading(true);

    try {
      const uploadedFiles = [];

      for (const file of files) {
        console.log('Uploading:', file.name);
        const url = await uploadFiles(file, 'image');
        uploadedFiles.push({ name: file.name, url });
      }

      setFormData((prev) => ({
        ...prev,
        extra_images: [...prev.extra_images, ...uploadedFiles],
      }));
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload extra images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container style={{ maxWidth: '600px', color: 'black', fontSize: '12px' }}>
      {/* <h2>Add New Product</h2> */}

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label className="mb-0 mt-2">Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label className="mb-0 mt-2">Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label className="mb-0 mt-2">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label className="mb-0 mt-2">Price</Form.Label>
          <Form.Control
            type="number"
            step="1"
            name="price"
            value={formData.price}
            defaultValue={0}
            min={0}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageUpload">
          <Form.Label className="mb-0 mt-2">Main Image</Form.Label>
          <Form.Control
            disabled={formData.image_url}
            ref={mainImageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleMainImageChange(e, setFormData, setUploading, setError)
            }
          />

          {formData.image_url && (
            <div style={{ width: '50px' }}>
              <Button
                variant="danger"
                size="sm"
                type="submit"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, image_url: '' }));
                  if (mainImageInputRef.current) {
                    mainImageInputRef.current.value = null;
                  }
                }}
              >
                X
              </Button>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="pdfUpload">
          <Form.Label className="mb-0 mt-2">Datasheet (PDF)</Form.Label>
          <Form.Control
            ref={pdfInputRef}
            type="file"
            accept="application/pdf"
            disabled={formData.datasheet_url}
            onChange={(e) =>
              handlePdfUpload(e, setFormData, setUploading, setError)
            }
          />

          {formData.datasheet_url && (
            <div style={{ width: '50px', marginTop: '6px' }}>
              <Button
                variant="danger"
                size="sm"
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, datasheet_url: '' }));
                  if (pdfInputRef.current) {
                    pdfInputRef.current.value = null;
                  }
                }}
              >
                X
              </Button>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="extraImages">
          <Form.Label className="mb-0 mt-2">Additional Images</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            multiple
            onChange={handleExtraImagesChange}
          />

          {formData.extra_images.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginTop: '8px',
              }}
            >
              {formData.extra_images.map((file, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{file.name}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        extra_images: prev.extra_images.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Form.Group>
        <div
          className="mt-3"
          style={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <Button variant="primary" type="submit" disabled={uploading}>
            {uploading ? (
              <>
                Uploading...
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ marginLeft: '8px' }}
                />
              </>
            ) : (
              <span>{onSubmit ? 'Update Product' : 'Add Product'}</span>
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={!onSubmit ? handleClose : editHandleClose}
            disabled={uploading}
            className="me-2"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddProductForm;
