import express from 'express';
import {
  createLead,
  getAllLeads,
    findLeadsByName,
    filterLeadsByStatus,
    sortLeadsByNameAsc,
    sortLeadsByNameDesc,
    sortLeadsByProductAsc,
    sortLeadsByProductDesc,
    sortLeadsByDateAsc,
    sortLeadsByDateDesc,
    updateNoteByEmail,
    updateStatusByEmail,
    deleteMultipleLeads,
    getLeadsByProductName,
    getProducts
} from '../controllers/leadsController.js';



const router = express.Router();


router.post('/createlead', createLead);


router.get('/getall', getAllLeads);
router.get('/search', findLeadsByName);
router.get('/filter', filterLeadsByStatus);

router.get('/getleadsproduct',getLeadsByProductName);

router.get('/sort/name/asc', sortLeadsByNameAsc);
router.get('/sort/name/desc', sortLeadsByNameDesc);

router.get('/sort/product/asc', sortLeadsByProductAsc);
router.get('/sort/product/desc', sortLeadsByProductDesc);

router.get('/sort/date/asc', sortLeadsByDateAsc);
router.get('/sort/date/desc', sortLeadsByDateDesc);

router.put('/note', updateNoteByEmail);

router.put('/status', updateStatusByEmail);

router.delete('/delete', deleteMultipleLeads);

router.get('/getallproducts',getProducts);
export default router;
