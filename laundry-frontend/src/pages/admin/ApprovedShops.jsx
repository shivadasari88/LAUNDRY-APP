import React, { useEffect, useState } from 'react';
import { getApprovedShops } from "../../api/adminApi";
import ShopTable from '../../components/admin/ShopTable';

const ApprovedShops = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await getApprovedShops();
                setShops(response.data);
            } catch (err) {
                console.error('Failed to fetch approved shops', err);
            } finally {
                setLoading(false);
            }
        };

        fetchShops();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                    Approved Shops
                </h3>
                <p className="text-indigo-200/60">
                    List of all active and approved laundry shops.
                </p>
            </div>

            <ShopTable shops={shops} loading={loading} status="APPROVED" />
        </div>
    );
};

export default ApprovedShops;
