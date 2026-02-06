import React, { useEffect, useState } from 'react';
import {getRejectedShops} from "../../api/adminApi";
import ShopTable from '../../components/admin/ShopTable';

const RejectedShops = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await getRejectedShops();
                setShops(response.data);
            } catch (err) {
                console.error('Failed to fetch rejected shops', err);
            } finally {
                setLoading(false);
            }
        };
        fetchShops();
    }, []);

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-lg font-medium text-slate-600">Rejected Shops</h3>
                <p className="text-sm text-slate-500">List of shops that were not approved for onboarding.</p>
            </div>
            <ShopTable shops={shops} loading={loading} status="REJECTED" />
        </div>
    );
};

export default RejectedShops;
