const Contact = require('../models/Contact');

// @desc    Create new contact
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({
            success: true,
            data: contact
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private
exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort('-createdAt');
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private
exports.getContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update contact
// @route   PUT /api/contact/:id
// @access  Private
exports.updateContact = async (req, res, next) => {
    try {
        let contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private
exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        await contact.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
}; 