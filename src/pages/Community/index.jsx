import { Layout, Menu, Typography, Card, List, Avatar } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { AppLayout } from '../../core/layouts/AppLayout';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Text } = Typography;

// Mock API for Community Highlights
const mockCommunityData = () => [
  {
    id: 1,
    title: 'Community Highlight A',
    description: 'A discussion on important topics.',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 2,
    title: 'Community Highlight B',
    description: 'Explore community-driven insights.',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 3,
    title: 'Community Highlight C',
    description: 'Share your thoughts and engage.',
    avatar: 'https://via.placeholder.com/40',
  },
];

export const Community = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const routeMapping = {
      1: '/',
      2: '/discover',
      3: '/chat',
      4: '/experts',
      5: '/community',
      6: '/friends',
      7: '/blog',
    };

    if (routeMapping[e.key]) {
      navigate(routeMapping[e.key]);
    }
  };

  const data = mockCommunityData();

  return (
    <AppLayout
      components={
        <Layout style={{ minHeight: '100vh' }}>
          <Layout
            style={{
              padding: '2rem',
              background: 'rgba(234, 230, 254, 1)',
            }}
          >
            {/* Sider */}
            <Sider width={300} theme='light'>
              <Menu
                onClick={handleMenuClick}
                mode='inline'
                defaultSelectedKeys={['5']}
                style={{
                  height: '100%',
                  borderRight: 0,
                  textAlign: 'start',
                  fontSize: '16px',
                  color: 'rgba(126, 96, 191, 1)',
                  background: 'rgba(205, 193, 255, 1)',
                }}
                items={[
                  { key: '1', label: 'Về Harmon' },
                  { key: '2', label: 'Khám Phá' },
                  { key: '3', label: 'Trò Chuyện' },
                  { key: '4', label: 'Chuyên Gia' },
                  { key: '5', label: 'Cộng Đồng' },
                  { key: '6', label: 'Bạn Bè' },
                  { key: '7', label: 'Blog' },
                ]}
              />
            </Sider>

            {/* Content */}
            <Content style={{ padding: '1rem' }}>
              <Typography.Title level={2} style={{ marginBottom: '1.5rem' }}>
                Cộng Đồng
              </Typography.Title>

              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      title={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={item.avatar} size='large' />
                          <Text strong style={{ marginLeft: '10px' }}>
                            {item.title}
                          </Text>
                        </div>
                      }
                      bordered
                      style={{
                        background: 'white',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Text type='secondary'>{item.description}</Text>
                    </Card>
                  </List.Item>
                )}
              />
            </Content>
          </Layout>
        </Layout>
      }
    />
  );
};
