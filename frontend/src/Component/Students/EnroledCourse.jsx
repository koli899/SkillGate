import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentNavbar from './navbar';


const EnroledCourse = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState({}); // { courseId: [lesson, ...] }
  const [unlockedLessons, setUnlockedLessons] = useState({}); // { courseId: unlockedIndex }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lessonModal, setLessonModal] = useState({ open: false, lesson: null, courseId: null, idx: null });

  const Base_url= import.meta.env.VITE_BASE_URL
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${Base_url}/course/yourCourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const courseList = response.data.courses || [];
        setCourses(courseList);
        // Fetch lessons for each course
        courseList.forEach(async (course) => {
          try {
            const res = await axios.get(`${Base_url}/lesson/all/${course._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const lessonArr = Array.isArray(res.data.lessons?.lessons)
              ? res.data.lessons.lessons
              : [];
            // Sort by createdAt (oldest first)
            lessonArr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setLessons(prev => ({ ...prev, [course._id]: lessonArr }));
            setUnlockedLessons(prev => ({ ...prev, [course._id]: 0 }));
          } catch {}
        });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <StudentNavbar />
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Enrolled Courses</h2>

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {!loading && !error && courses.length === 0 && (
        <p style={{ textAlign: 'center' }}>No courses enrolled yet.</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', padding: '20px' }}>
        {courses.map((course) => (
          <div key={course._id} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            background: '#fff',
          }}>
            <h3 style={{ marginBottom: 8 }}>{course.course}</h3>
            <p style={{ marginBottom: 4 }}>{course.description}</p>
            <p style={{ marginBottom: 4 }}><strong>Duration:</strong> {course.duration}</p>
            <p style={{ marginBottom: 12 }}><strong>Price:</strong> ₹{course.price}</p>
            {/* Lessons ladder */}
            <div style={{ borderLeft: '3px solid #e2e8f0', marginLeft: 8, paddingLeft: 16 }}>
              <h4 style={{ fontSize: '1rem', margin: '8px 0' }}>Lessons</h4>
              {lessons[course._id] && lessons[course._id].length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {lessons[course._id].map((lesson, idx) => {
                    const unlocked = idx <= (unlockedLessons[course._id] ?? 0);
                    return (
                      <div
                        key={lesson._id}
                        style={{
                          background: unlocked ? '#f7fafc' : '#e2e8f0',
                          padding: '12px 16px',
                          borderRadius: 8,
                          boxShadow: unlocked ? '0 1px 4px rgba(0,0,0,0.04)' : 'none',
                          opacity: unlocked ? 1 : 0.5,
                          pointerEvents: unlocked ? 'auto' : 'none',
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          marginBottom: 2,
                          cursor: unlocked ? 'pointer' : 'not-allowed',
                        }}
                        onClick={() => unlocked && setLessonModal({ open: true, lesson, courseId: course._id, idx })}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600 }}>{idx + 1}. {lesson.title}</span>
                          {!unlocked && <span style={{ color: '#888', fontSize: 14, marginLeft: 8 }}>🔒 Locked</span>}
                        </div>
                        <div style={{ fontSize: 14, color: '#555', margin: '4px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{lesson.summary}</div>
                      </div>
                    );
                  })}
      {/* Lesson Full Details Modal */}
      {lessonModal.open && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setLessonModal({ open: false, lesson: null, courseId: null, idx: null })}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 10,
              padding: 28,
              minWidth: 320,
              maxWidth: 480,
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button style={{ position: 'absolute', top: 10, right: 14, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }} onClick={() => setLessonModal({ open: false, lesson: null, courseId: null, idx: null })}>&times;</button>
            <h3 style={{ marginBottom: 10 }}>{lessonModal.lesson?.title}</h3>
            <div style={{ fontSize: 15, color: '#444', marginBottom: 18, whiteSpace: 'pre-wrap' }}>{lessonModal.lesson?.summary}</div>
            {lessonModal.idx === (unlockedLessons[lessonModal.courseId] ?? 0) && (
              <button
                style={{ background: '#3182ce', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 22px', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => {
                  setUnlockedLessons(prev => ({ ...prev, [lessonModal.courseId]: lessonModal.idx + 1 }));
                  setLessonModal({ open: false, lesson: null, courseId: null, idx: null });
                }}
              >
                Complete
              </button>
            )}
          </div>
        </div>
      )}
                </div>
              ) : (
                <div style={{ color: '#888', fontSize: 14 }}>No lessons yet.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnroledCourse;
