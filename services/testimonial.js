import Testimonial from '../models/Testimonial.js'

export const createTestimonial = async (data)=>{
    const newTestimonial = new Testimonial(data);
    await newTestimonial.save();
    return newTestimonial;
};

export const getTestimonials = async (startupId)=>{
    const testimonials = await Testimonial.find({ startupId });
    return testimonials;
}


export const getTestimonialById = async (id) => {
    const testimonial = await Testimonial.findById(id).populate('startupId');
    return testimonial;
  };
  
  // Update a testimonial
  export const updateTestimonial = async (id, data) => {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true });
    return updatedTestimonial;
  };
  
  // Delete a testimonial
  export const deleteTestimonial = async (id) => {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    return deletedTestimonial;
  };