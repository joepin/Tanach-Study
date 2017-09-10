import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherID: this.props.match.params.id,
      teacher: {},
    };
  }

  updateState(key, value) {
    console.log(key, value)
    this.setState({
      [key]: value,
    });
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    fetch(`/api/teachers/${this.state.teacherID}`)
    .then(r => r.json())
    .then(data => this.updateState('teacher', data))
    .catch(err => console.log(err));
  }

  render() {
    const teacher = this.state.teacher || {};
    const info = teacher.teacher_info || {};
    const teacherBooks = this.state.teacher.teacher_books || [];
    const mappedBooks = teacherBooks.map((book, i) => {
      return (
        <div className="col l4 m6 s12" key={i}>
          <Link to={`/sefarim/${book.book_name}`}>
            <div className="card hoverable full-width black-text">
              <div className="card-content">
                {book.pretty_eng}
              </div>
            </div>
          </Link>
        </div>
      );
    })
    return (
      <div className="container">
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="row valign-wrapper">
                <div className="col l3 m4 s12 offset-l1 valign">
                  <img src={info.image_url} alt="" className="responsive-img full-width circle"/>
                </div>
                <div className="col l8 m8 s12 valign">
                  <h2 className="teacher-title">{info.title} {info.fname}{info.mname ? ` ${info.mname} ` : ' '}{info.lname}</h2>
                  <div><i>{info.short_bio}</i></div>
                </div>
              </div>
              <div className="row">
                <div className="col l10 m12 s12 offset-l1">
                  <p>{info.long_bio}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="row">
                <h4 className="col l12 m12 s12 left-align">Sefarim that {info.title} {info.fname}{info.mname ? ` ${info.mname} ` : ' '}{info.lname} Taught</h4>
                {mappedBooks}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
