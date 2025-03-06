import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../core/layouts/AppLayout';
import { Layout } from 'antd';
import { getExperts } from '../../services/expert';
import Sidebar from './Sidebar';
import Content from './Content';

function Expert() {
  const [expertList, setExpertList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getExperts();
      console.log(res.data.items);

      setExpertList(res.data.items);
    };
    fetchData();
  }, []);
  return (
    <AppLayout
      components={
        <Layout
          style={{
            minHeight: '100vh',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '100px',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}>
            <div style={{ width: '20%' }}>
              <Sidebar />
            </div>
            <div style={{ width: '80%', marginLeft: '50px' }}>
              <Content expertList={expertList} />
            </div>
          </div>
        </Layout>
      }
    />
  );
}

export default Expert;
