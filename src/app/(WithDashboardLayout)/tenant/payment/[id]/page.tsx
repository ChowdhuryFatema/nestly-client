'use client'

import Payment from "@/components/modules/payment/Payment";
import { getTenantRequestById } from "@/services/TenantService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
    const { id } = useParams();
    const [request, setRequest] = useState<any>(null);


    useEffect(() => {
        const fetchData = async () => {
            const data = await getTenantRequestById(id as string);
            setRequest(data);
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <Payment request={request?.data} />
        </div>
    );
}

