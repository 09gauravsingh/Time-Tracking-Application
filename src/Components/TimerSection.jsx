import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Modal, Button, Accordion } from "react-bootstrap";
import "./TimerSection.css";
import TaskSection from "./TaskSection";

const TimerSection = () => {
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timerInterval, setTimerInterval] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [tasks, setTasks] = useState([]);

  const timerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const handleStart = () => {
    if (!timerInterval) {
      setTimerInterval(
        setInterval(() => {
          setTime((prev) => prev + 1);
        }, 1000)
      );
    }
  };

  const handlePause = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTime(0);
    setDescription("");
    setTitle("");
  };

  const prevSave = () => {
    handlePause();
    setOpenModal(true);
  };

  const handleSave = () => {
    setOpenModal(false);
    setTasks([
      ...tasks,
      {
        title: titleRef.current.value,
        description: descRef.current.value,
        time: time,
      },
    ]);
    console.log(tasks);
    resetTimer();
  };

  return (
    <>
      <Accordion
        defaultActiveKey={["0"]}
        className="accordion-timer"
        alwaysOpen
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Timer Section</Accordion.Header>
          <Accordion.Body>
            <h2>
              Digital Timer:{new Date(time * 1000).toISOString().substr(11, 8)}
            </h2>
            <Button
              onClick={handleStart}
              disabled={timerInterval}
              variant="info"
            >
              START
            </Button>{" "}
            <Button
              onClick={handlePause}
              disabled={!timerInterval}
              variant="warning"
            >
              PAUSE
            </Button>{" "}
            <Button onClick={prevSave} disabled={!time} variant="success">
              SAVE
            </Button>
            {openModal && (
              <div>
                <Modal show={openModal} onHide={() => setOpenModal(false)}>
                  <Modal.Header>
                    <Modal.Title>Add Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container>
                      <Row>
                        <Col xs={4} md={4}>
                          <label htmlFor="title">Title:</label>
                        </Col>
                        <Col md={8}>
                          <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            ref={titleRef}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={3} md={4}>
                          <label htmlFor="description">Description:</label>
                        </Col>
                        <Col md={8}>
                          <textarea
                            className="input-box"
                            type="input"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            ref={descRef}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="success" onClick={handleSave}>
                      Save
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Tasks Section</Accordion.Header>
          <Accordion.Body>
            <TaskSection tasks={tasks} time={time} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default TimerSection;
