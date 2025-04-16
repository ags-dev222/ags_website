import * as testimonialService from '../services/testimonialService.js'


export const createTestimonial = async (req, res) =>{
    try {
        const { startupId, message, investorName } =req.body;
        const testimonial = await testimonialService.createTestimonial({ startupId, message, investorName });
        res.status(201).json(testimonial);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const getTestimonials = async (req, res ) =>{
    try {
        const testimonials = await testimonialService.getTestimonials(req.params.startupId);
        res.status(200).json(testimonials);
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

export const getTestimonialById = async (req, res) => {
    try {
      const testimonial = await testimonialService.getTestimonialById(req.params.id);
      if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
      res.status(200).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a testimonial
  export const updateTestimonial = async (req, res) => {
    try {
      const updatedTestimonial = await testimonialService.updateTestimonial(req.params.id, req.body);
      if (!updatedTestimonial) return res.status(404).json({ message: 'Testimonial not found' });
      res.status(200).json(updatedTestimonial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete a testimonial
  export const deleteTestimonial = async (req, res) => {
    try {
      const deletedTestimonial = await testimonialService.deleteTestimonial(req.params.id);
      if (!deletedTestimonial) return res.status(404).json({ message: 'Testimonial not found' });
      res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };