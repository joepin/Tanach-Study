import React, { Component } from 'react';
import { Link } from 'react-router';
import Slider from './Slider/Slider.jsx';
import Testimonials from './Testimonials/Testimonials.jsx';
import testimonials from '../../../public/testimonials.json';
import styles from './Slider/Slider.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        {
          url: '/assets/images/ts_bg_1.JPG',
          captionRight: 'Passuk 1 in Hebrew',
          captionLeft: 'Passuk 1 in English',
        },
        {
          url: '/assets/images/ts_bg_2.png',
          captionRight: 'Passuk 2 in Hebrew',
          captionLeft: 'Passuk 2 in English',
        },
        {
          url: '/assets/images/ts_bg_3.JPG',
          captionRight: 'Passuk 3 in Hebrew',
          captionLeft: 'Passuk 3 in English',
        },
      ],
      currentIndex: 0,
      testimonials: testimonials,
      leftCaptionDiv: '',
      rightCaptionDiv: '',
    }
  }

  updateState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    init(jQuery);
  }

  render() {
    return(
      <div>
        <div className="hide-on-med-and-up">
          <div className="section no-pad-top">
            <div className="container">
              <h1 className="header center tsblue-text">Tanach Study</h1>
              <div className="row center">
                <h5 className="header col s12 light">Fusing modern technologies<br/>with ancient texts</h5>
              </div>
              <div className="row center">
                <Link to="/signup" className="btn-large waves-effect waves-light teal lighten-1 hoverable">Sign Up Now!</Link>
              </div>
            </div>
            <Slider slides={this.state.images} index={this.state.currentIndex} />
          </div>
        </div>

        <div className="slider hide-on-small-only">
          <div className="full-width row">
            <div className="col l4 m3">{this.state.leftCaptionDiv}</div>
            <div className="col l4 m6">
                <div className="card">
                  <div className="card-content center">
                    <h1 className="header tsblue-text">Tanach Study</h1>
                    <h5 className="header col s12 light">Fusing modern technologies<br/>with ancient texts</h5>
                    <Link to="/signup" className="btn-large waves-effect waves-light tsblue hoverable">Sign Up Now!</Link>
                  </div>
                </div>
              </div>
            <div className="col l4 m3">{this.state.rightCaptionDiv}</div>
            <Slider
              slides={this.state.images}
              index={this.state.currentIndex}
            />
          </div>
        </div>

        <div className="container">
          <div className="section">

            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center tsblue-text"><i className="material-icons">headset</i></h2>
                  <h5 className="center">Mode of Study</h5>

                  <p className="light center-align">A free digital Tanach study program that is all-encompassing and geared towards English-speaking communities around the world.</p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center tsblue-text"><span>&#128214;</span></h2>
                  <h5 className="center">Torah Content</h5>

                  <p className="light center-align">We offer you an  experience that allows you to become intimately familiar with the text, framework, and storyline of the Tanach. Every Sefer. Every Perek. Every Pasuk.</p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center tsblue-text"><span>&#10017;</span></h2>
                  <h5 className="center">Build Identity</h5>
                  <p className="light center-align">To increase knowledge of your ancestral Jewish history, to strengthen your sense of awe and love of God, and reinforce your personal and national Jewish identity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="center">
          <img src="/assets/images/collage.png" alt="Collage of all educators" className="responsive-img" />
        </div>


        <div className="white container">
          <Testimonials testimonials={this.state.testimonials}/>
        </div>
      </div>
    );
  }
}

export default HomePage;
