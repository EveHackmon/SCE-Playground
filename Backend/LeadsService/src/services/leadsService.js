import * as data from '../data-access/leadsDataAccess.js';
import axios from 'axios';
export const create = async (leadData) => {
  const { full_name, phone, email, product_interest,lead_source } = leadData;

 
  if (!full_name || full_name.trim() === '') {
    throw new Error('Full name is required');
  }

  if (full_name.length > 255) {
    throw new Error('Full name must be at most 255 character');
  }

  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(full_name)) {
    throw new Error('Full name can contain only letters and spaces');
  }

  if (!phone || phone.trim() === '') {
    throw new Error('Phone is required');
  }
  

  
  const phoneRegex = /^05\d{8}$/;
  if (!phone || !phoneRegex.test(phone)) {
    throw new Error('Phone number must be in format like 05XXXXXXXX');
  }

  
  if (!phone || !phoneRegex.test(phone)) {
    throw new Error('Phone number must be 10 digits and start with 05 (e.g. 0501234567)');
  }
  
  if (!email || email.trim() === '') {
    throw new Error('Email is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co\.il)$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email must be in format like example@example.com (com or co.il)');
  }

  
  if (!product_interest || product_interest.trim() === '') {
    throw new Error('Product interest is required');
  }

  if (product_interest.length > 255) {
    throw new Error('Product interest must be at most 255 characters');
  }
  

 
  const allLeads = await data.getAllLeads();

  if (allLeads.find((lead) => lead.email === email)) {
    throw new Error('Lead with this email already exists');
  }

  if (allLeads.find((lead) => lead.phone === phone)) {
    throw new Error('Lead with this phone number already exists');
  }

  
  return await data.createLead(leadData);
};

export const getAll = async () => await data.getAllLeads();

export const findByName = async (name) => {
    if (!name || name.trim() === '') {
        throw new Error('Name is required');
    }
    
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        throw new Error('Name can contain only letters and spaces');
    }
    
    return await data.findLeadsByName(name);
};

export const filterByStatus = async (status) => {
    if (!status || status.trim() === '') {
        throw new Error('Status is required');
    }
    
    const validStatuses = ['New', 'Contacted', 'Disqualified'];
    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
    }
    
    return await data.filterLeadsByStatus(status);
};

export const sortByNameAsc = async () => await data.sortByNameAsc();

export const sortByNameDesc = async () => await data.sortByNameDesc();

export const sortByProductAsc = async () => await data.sortByProductAsc();

export const sortByProductDesc = async () => await data.sortByProductDesc();

export const sortByDateAsc = async () => await data.sortByDateAsc();

export const sortByDateDesc = async () => await data.sortByDateDesc();

 export const fetchAllproducts = async () => {
  try {
    const product = await axios.get(
      'https://sce-playground-e9ie.onrender.com/read-all-products'
    );
    console.log('Products fetched successfully:', product.data);
    return product.data;
  } catch (err) {
    console.error('Error fetching products from product Service:', err.message);
    throw new Error(`Failed to fetch products: ${err.message}`);
  }
};

export const updateNoteByEmail = async (email, note) => {
    if (!email || email.trim() === '') {
        throw new Error('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co\.il)$/;
    if (!emailRegex.test(email)) {
        throw new Error('Email must be in format like example@example.com (com or co.il)');
    }
    if(note.length > 255) {
        throw new Error('Note must be at most 255 characters');
    }
    return await data.updateNoteByEmail(email, note);
};

export const updateStatusByEmail = async (email, status) => {
    if (!email || email.trim() === '') {
        throw new Error('Email is required');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co\.il)$/;
    if (!emailRegex.test(email)) {
        throw new Error('Email must be in format like example@example.com (com or co.il)');
    }
    if (!status || status.trim() === '') {
        throw new Error('Status is required');
    }
    const validStatuses = ['New', 'Contacted', 'Disqualified','Converted'];
    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
    }
    return await data.updateStatusByEmail(email, status);
};

export const deleteMultipleLeads = async (emails) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co\.il)$/;
  if (!Array.isArray(emails) || emails.length === 0) {
    throw new Error('Must provide a non-empty list of emails');
  }

  for (const email of emails) {
    if (!email || email.trim() === '') {
      throw new Error('All emails must be non-empty');
    }

    if (!emailRegex.test(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }
  }

  return await data.deleteLeadsByEmails(emails);
};

export const getLeadsProductName = async (productName) => {
    if (!productName || productName.trim() === '') {
        throw new Error('Product name is required');
    }

    if (productName.length > 255) {
      throw new Error('Product interest must be at most 255 characters');
    }
    
    return await data.getLeadsByProductName(productName);
};

