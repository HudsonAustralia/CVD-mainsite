import { z } from 'zod';

const schema = z.object({
    // cdhr: z.string().array().nonempty(),
    age: z.number({ required_error: "Age is required"}).min(30, { message: 'Age is too low for accurate risk assessment' }).max(79, { message: 'Age is too high for accurate risk assessment'}),
    // sex: z.string({ required_error: "Please select one of the options"}),
    // smoking: z.string({ required_error: "Please select one of the options"}),
    // bp: z.number({ required_error: "Blood pressure is required"}).min(0, { message: 'Please enter a valid number'}),
    // cholesterol: z.number({ required_error: "This field is required"}),
    // cho_total: z.number({ required_error: "This field is required"}),
    // cho_short: z.number({ required_error: "This field is required"}),
    // cvd_medicine: z.string({ required_error: "This field is required"}),
    // diabetes: z.string({ required_error: "This field is required"}),
    // year: z.string({ required_error: "This field is required"}),
    // HbA1c: z.number({ required_error: "This field is required"}),
    // uACR: z.number({ required_error: "This field is required"}),
    // eGFR: z.number({ required_error: "This field is required"}),
    // Weight: z.number({ required_error: "This field is required"}),
    // Height: z.number({ required_error: "This field is required"}),
    // insulin: z.string({ required_error: "This field is required"}),
  });


  export default schema;