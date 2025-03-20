import { z } from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/webp'];

async function checkMail({ email }: { email: string }) {
  return { exists: false }; // Mock response, replace with actual API call
}

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one digit')
  .regex(/[!@#$%^&*]/, 'Password must contain at least one special character');

export const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Cannot be empty')
    .email('Invalid email')
    .refine(async (email) => {
      const { exists } = await checkMail({ email });
      return !exists;
    }, { message: 'Email is already registered - Try to login instead' }),

  phone: z
    .string()
    .min(1, 'Cannot be empty')
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),

  password: passwordSchema,
});

export type InfoType = z.infer<typeof formSchema>;

export const formSchema2 = z.object({
  fullName: z.string().min(4, 'Cannot be empty'),

  file: z.any().refine(
    (file) => file && file.size <= MAX_FILE_SIZE,
    'Max image size is 5MB'
  ).refine(
    (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png, .svg, and .webp formats are supported'
  ),

  dob: z.string().min(5, 'Cannot be empty'),
  gender: z.string().min(4, 'Cannot be empty'),
});

export type InfoType2 = z.infer<typeof formSchema2>;

export const formSchema3 = z.object({
  role: z.string()
    .refine((value) => value !== '', { message: 'Please select any one option' })
    .refine((value) => ['student', 'developer', 'designer', 'manager'].includes(value), {
      message: 'Invalid Selection',
    }),
});

export type InfoType3 = z.infer<typeof formSchema3>;
