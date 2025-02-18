// import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

const ExamView = () => {
  const { currentUser } = useAuth();

  // Exam schedule data
  const examSchedule = [
    {
      date: '202502-24',
      day: 'Saturday',
      exams: [
        {
          subject: 'Mathematics',
          time: '10:00 AM - 12:00 PM',
          room: '301',
          type: 'Unit Test',
          syllabus: 'Unit 1 & 2'
        }
      ]
    },
    {
      date: '2025-02-25',
      day: 'Sunday',
      exams: [] // No exams on Sunday
    },
    {
      date: '2025-02-26',
      day: 'Monday',
      exams: [
        {
          subject: 'Physics',
          time: '10:00 AM - 12:00 PM',
          room: '302',
          type: 'Unit Test',
          syllabus: 'Unit 1 & 2'
        }
      ]
    },
    {
      date: '2025-02-27',
      day: 'Tuesday',
      exams: [
        {
          subject: 'Chemistry',
          time: '10:00 AM - 12:00 PM',
          room: '303',
          type: 'Unit Test',
          syllabus: 'Unit 1 & 2'
        }
      ]
    },
    {
      date: '2025-02-28',
      day: 'Wednesday',
      exams: [
        {
          subject: 'Computer Science',
          time: '10:00 AM - 12:00 PM',
          room: '304',
          type: 'Unit Test',
          syllabus: 'Unit 1 & 2'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <Card.Header>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Unit Test Schedule
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              February 24 - February 28, 2024
            </p>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser?.personalDetails?.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Roll Number</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser?.academicDetails?.rollNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser?.academicDetails?.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Class</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser?.academicDetails?.className}</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Exam Schedule */}
        <div className="space-y-4">
          {examSchedule.map((day) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <Card.Header>
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {day.day}
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(day.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </Card.Header>
                <Card.Body>
                  {day.exams.length > 0 ? (
                    day.exams.map((exam, index) => (
                      <motion.div
                        key={index}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {exam.subject}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Room: {exam.room}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Time: {exam.time}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Syllabus: {exam.syllabus}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                      No exams scheduled
                    </p>
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Important Instructions */}
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Important Instructions
            </h2>
          </Card.Header>
          <Card.Body>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>Arrive at least 15 minutes before the examination time</li>
              <li>Bring your student ID card and hall ticket</li>
              <li>No electronic devices allowed in the examination hall</li>
              <li>Read all questions carefully before attempting</li>
              <li>Write your roll number on every page</li>
            </ul>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ExamView; 