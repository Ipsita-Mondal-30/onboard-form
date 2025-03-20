'use client'
import { useState } from "react";
import { z } from "zod";

export type ZodVerifyFormErrors<Data> = {
    [Property in keyof Data]?: string[];
};

function useZodVerifySchema<Data>(schema: z.ZodSchema<Data>, data: Data) {
    const [fieldErrors, setFieldErrors] = useState<ZodVerifyFormErrors<Data>>({});

    async function verifySchema() {
        setFieldErrors({});

        const response = await schema.safeParseAsync(data);
        if (!response.success) {
            const errors = response.error.flatten().fieldErrors as ZodVerifyFormErrors<Data>;
            setFieldErrors(errors);
            return false;
        }
        return true;
    }

    return [verifySchema, fieldErrors, setFieldErrors] as const;
}

export default useZodVerifySchema;
