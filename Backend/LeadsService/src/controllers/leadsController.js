import * as leadsService from '../services/leadsService.js';

export const createLead = async (req, res) => {
    console.log('🟢 נכנסתי ל־createLead');
    console.log('📥 body:', req.body);
    try {
      const { full_name, email, phone, product_interest,lead_source } = req.body;
      const lead = await leadsService.create({ full_name, email, phone, product_interest,lead_source });
  
      res.status(201).json(lead);
    } catch (error) {
      console.error('Create lead error:', error);
  
      
      res.status(400).json({ message: error.message });
    }
  };
  export const getProducts = async (req, res) => {
  try {
    const products = await leadsService.fetchAllproducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res
      .status(500)
      .json({ message: 'Failed to fetch products', details: error.message });
  }
};

export const getAllLeads = async (req, res) => {
    
    try {
        const leads = await leadsService.getAll();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};

export const findLeadsByName = async (req, res) => {
    try {
        const { name } = req.query;
        const leads = await leadsService.findByName(name);
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};

export const filterLeadsByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        const leads = await leadsService.filterByStatus(status);
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};

export const sortLeadsByNameAsc = async (req, res) => {
    try {
        const leads = await leadsService.sortByNameAsc();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};

export const sortLeadsByNameDesc = async (req, res) => {
    try {
        const leads = await leadsService.sortByNameDesc();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};

export const sortLeadsByProductAsc = async (req, res) => {
    try {
        const leads = await leadsService.sortByProductAsc();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};

export const sortLeadsByProductDesc = async (req, res) => {
    try {
        const leads = await leadsService.sortByProductDesc();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};

export const sortLeadsByDateAsc = async (req, res) => {
    try {
        const leads = await leadsService.sortByDateAsc();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};

export const sortLeadsByDateDesc = async (req, res) => {
    try {
        const leads = await leadsService.sortByDateDesc();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};

export const updateNoteByEmail = async (req, res) => {
    
    

    try {
        const { email, note } = req.body;
        const updatedLead = await leadsService.updateNoteByEmail(email, note);
        res.status(200).json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: 'Error updating lead note', error });
    }
};


export const updateStatusByEmail = async (req, res) => {
    try {
        const { email, status } = req.body;
        const updatedLead = await leadsService.updateStatusByEmail(email, status);
        res.status(200).json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: 'Error updating lead status', error });
    }
};

export const deleteMultipleLeads = async (req, res) => {
    try {
      const { emails } = req.body;
  
      await leadsService.deleteMultipleLeads(emails);
  
      res.status(200).json({ message: 'Leads deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const getLeadsByProductName = async (req, res) => {
    try {
        const { productName } = req.query;
        const leads = await leadsService.getLeadsProductName(productName);
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
    };



