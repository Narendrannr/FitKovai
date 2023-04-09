import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch upcoming events from the server
    axios.get('/api/events').then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Upcoming Events</h1>
          <Calendar
            tileContent={({ date, view }) =>
              view === 'month' &&
              events.map((event) => {
                const eventDate = new Date(event.date);
                if (
                  eventDate.getDate() === date.getDate() &&
                  eventDate.getMonth() === date.getMonth() &&
                  eventDate.getFullYear() === date.getFullYear()
                ) {
                  return (
                    <div key={event.id} className="event-marker">
                      {event.title}
                    </div>
                  );
                }
                return null;
              })
            }
          />
        </div>
        <div className="col-md-6">
          <h1>Picture Gallery</h1>
          <Link to="/gallery">
            <div className="gallery-placeholder">
              <img src="/images/gallery-placeholder.jpg" alt="Picture Gallery" />
              <div className="overlay">
                <h2>View Gallery</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h1>Blog</h1>
          <Link to="/blog">
            <div className="blog-placeholder">
              <img src="/images/blog-placeholder.jpg" alt="Blog" />
              <div className="overlay">
                <h2>Read Blog</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6">
          <h1>Discussion Forum</h1>
          <Link to="/forum">
            <div className="forum-placeholder">
              <img src="/images/forum-placeholder.jpg" alt="Discussion Forum" />
              <div className="overlay">
                <h2>Join Forum</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
