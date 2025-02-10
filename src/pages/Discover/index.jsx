import { Layout, Menu, Typography, Card, List } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { AppLayout } from '../../core/layouts/AppLayout';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Text } = Typography;

// Mock API for Discover Content
const mockDiscoverData = () => [
  { id: 1, title: 'Topic A', description: 'Explore Topic A in detail.' },
  { id: 2, title: 'Topic B', description: 'Discover insights about Topic B.' },
  { id: 3, title: 'Topic C', description: 'Learn more about Topic C.' },
];

export const Discover = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    // Map menu keys to routes
    const routeMapping = {
      1: '/',
      2: '/discover',
      3: '/chat',
      4: '/experts',
      5: '/community',
      6: '/friends',
      7: '/blog',
    };

    // Navigate to the corresponding route
    if (routeMapping[e.key]) {
      navigate(routeMapping[e.key]);
    }
  };

  const data = mockDiscoverData();

  return (
    <AppLayout
      components={
        <Layout style={{ minHeight: '100vh' }}>
          {/* Main Layout with Sider and Content */}
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
                defaultSelectedKeys={['2']}
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
                Khám Phá
              </Typography.Title>

              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      title={<Text strong>{item.title}</Text>}
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
