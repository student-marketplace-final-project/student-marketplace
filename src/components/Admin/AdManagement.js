import React, { useEffect, useState } from 'react';
import { getAds, archiveAd, activateAd } from '../../Services/adminService';
import "./admin.css"
const AdManagement = () => {
    const [ads, setAds] = useState([]);
    const token = localStorage.getItem('A##KEY'); // Get token for authorization

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        const response = await getAds(token);
        setAds(response.data);
    };

    const handleArchiveAd = async (adId) => {
        await archiveAd(adId, token);
        fetchAds(); // Refresh ad list
    };

    const handleActivateAd = async (adId) => {
        await activateAd(adId, token);
        fetchAds(); // Refresh ad list
    };

    return (
        <div className='page-content'>
            <h2>Ad Management</h2>
            <table className="ad-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.ads && ads.ads.map((ad) => (
                        <tr key={ad.ad_id}>
                            <td>{ad.title}</td>
                            <td>{ad.is_archived ? 'Archived' : 'Active'}</td>
                            <td>
                                {ad.is_archived ? (
                                    <button onClick={() => handleActivateAd(ad.ad_id)}>Activate</button>
                                ) : (
                                    <button onClick={() => handleArchiveAd(ad.ad_id)}>Archive</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdManagement;
