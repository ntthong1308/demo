<<<<<<< HEAD
// src/pages/ChatBot.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const ChatBot = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await axios.post('http://localhost:8080/bot/chat', null, {
        params: { prompt },
      });
      setResponse(res.data);
    } catch (err) {
      setError('Lỗi khi gửi yêu cầu tới chatbot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">Chatbot Hỏi Đáp Y Tế</h2>
          <Card className="p-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nhập câu hỏi của bạn:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ví dụ: Triệu chứng của tiểu đường là gì?"
                />
              </Form.Group>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" /> Đang gửi...
                  </>
                ) : (
                  'Gửi câu hỏi'
                )}
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {response && (
              <Alert variant="success" className="mt-3">
                <strong>Trả lời:</strong> <br />
                {response}
              </Alert>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBot;
=======
// src/pages/ChatBot.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const ChatBot = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await axios.post('http://localhost:8080/bot/chat', null, {
        params: { prompt },
      });
      setResponse(res.data);
    } catch (err) {
      setError('Lỗi khi gửi yêu cầu tới chatbot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">Chatbot Hỏi Đáp Y Tế</h2>
          <Card className="p-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nhập câu hỏi của bạn:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ví dụ: Triệu chứng của tiểu đường là gì?"
                />
              </Form.Group>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" /> Đang gửi...
                  </>
                ) : (
                  'Gửi câu hỏi'
                )}
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {response && (
              <Alert variant="success" className="mt-3">
                <strong>Trả lời:</strong> <br />
                {response}
              </Alert>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBot;
>>>>>>> 1a644ab (1)
