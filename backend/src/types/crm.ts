import { z } from "zod";

export const CRMRecordSchema = z.object({
  created_at: z.string(),

  name: z.string(),

  email: z.string(),

  country_code: z.string(),

  mobile_without_country_code: z.string(),

  company: z.string(),

  city: z.string(),

  state: z.string(),

  country: z.string(),

  lead_owner: z.string(),

  crm_status: z.string(),

  crm_note: z.string(),

  data_source: z.string(),

  possession_time: z.string(),

  description: z.string(),
});

export const CRMArraySchema = z.array(CRMRecordSchema);