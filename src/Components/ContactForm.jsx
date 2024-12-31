import { useFormik } from "formik";
import * as Yup from "yup";

const ContactForm = () => {
  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values) => {
      alert("Form submitted: " + JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="bg-gray-100 p-6 rounded-lg" onSubmit={formik.handleSubmit}>
      <input
        name="name"
        placeholder="Your Name"
        className="w-full p-3 mb-4 border rounded-lg"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name && <div className="text-red-500">{formik.errors.name}</div>}

      <input
        name="email"
        type="email"
        placeholder="Your Email"
        className="w-full p-3 mb-4 border rounded-lg"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}

      <textarea
        name="message"
        placeholder="Your Message"
        className="w-full p-3 mb-4 border rounded-lg"
        onChange={formik.handleChange}
        value={formik.values.message}
      ></textarea>
      {formik.errors.message && <div className="text-red-500">{formik.errors.message}</div>}

      <button type="submit" className="w-full bg-yellow-400 p-3 rounded-lg hover:bg-yellow-500">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
