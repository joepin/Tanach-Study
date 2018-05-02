import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TeacherCard from './TeacherCard.jsx';
import ReaderCard from './ReaderCard.jsx';
import Tanach from '../Tanach/Tanach.jsx';

class NachPerek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'heb',
    };
  }

  render() {
    const { act, formatDir, sefer, perek, prettySefer } = this.props;

    const partName = encodeURIComponent(formatDir(act.part_name));
    const seferName = encodeURIComponent(formatDir(sefer));
    const fileName = `${sefer.replace(/ /g, '-')}-${perek}.mp3`;
    const teamimName = `${sefer.replace(/ /g, '-')}-${perek}-teamim.mp3`;
    const hasTeamim = act.reader_id ? true : false;

    // initialize null variables for the next and previous sefer and perek
    let prevSeferName = null;
    let nextSeferName = null;
    let prevPerekNum = null;
    let nextPerekNum = null;
    // store the int of the current perek num in a var
    const curPerekNum = parseInt(perek, 10);
    const curSeferName = sefer;

    // if the current perek is the first of the book...
    if (curPerekNum <= 1) {
      // check if there is a book before this one (i.e. that this is not the first book)
      if (act.prev_book_id) {
        // if there is, then use that info for the previous perek
        prevPerekNum = act.prev_book_num_chapters;
        prevSeferName = act.prev_book_name;
      } else {
        // if it is the first book and perek, set these values to null
        prevPerekNum = null;
        prevSeferName = null;
      }
      // check to make sure that there is a next perek as well
      if (curPerekNum >= act.book_num_chapters) {
        if (act.next_book_id) {
          nextPerekNum = 1;
          nextSeferName = act.next_book_name;
        }
      } else {
        nextPerekNum = curPerekNum + 1;
        nextSeferName = curSeferName;
      }
    }

    // if the current perek is the last of the sefer...
    if (curPerekNum >= act.book_num_chapters) {
      // check if there is a book after this one (i.e. that this is not the last book)
      if (act.next_book_id) {
        // if there is, then use that info for the next perek
        nextPerekNum = 1;
        nextSeferName = act.next_book_name;
      } else {
        // if it is the last book and perek, set these values to null
        nextPerekNum = null;
        nextSeferName = null;
      }

      if (curPerekNum <= 1) {
        if (act.prev_book_id) {
          prevPerekNum = act.prev_book_num_chapters;
          prevSeferName = act.prev_book_name;
        }
      } else {
        prevPerekNum = curPerekNum - 1;
        prevSeferName = act.curSeferName;
      }
    }
    // if the current perek is anywhere else in the middle, then just set the next and prev data to the current sefer, and simple math.
    if (curPerekNum > 1 && curPerekNum < act.book_num_chapters) {
      prevPerekNum = curPerekNum - 1;
      prevSeferName = curSeferName;
      nextSeferName = curSeferName;
      nextPerekNum = curPerekNum + 1;
    }

    return (
      <div>
        <div className='container'>
          <div className='row'>
            <h2>Sefer {prettySefer} Perek {perek}</h2>
            <Link to={`/sefarim/${sefer}`} className='left'><i>Back to Sefer {prettySefer}</i></Link>
            <div className='section' />
            <TeacherCard
              activePerek={act}
              partName={partName}
              seferName={seferName}
              fileName={fileName}
            />
            <ReaderCard
              activePerek={act}
              partName={partName}
              seferName={seferName}
              teamimName={teamimName}
            />
          </div>
          <div className='row center'>
            <div className='col l2 m2 s12'>
              <Link to={`/perakim/${prevSeferName}/${prevPerekNum}`}>Previous Perek</Link>
            </div>
            <div className='col l8 m8 hide-on-small-only' />
            <div className='col l2 m2 s12'>
              <Link to={`/perakim/${nextSeferName}/${nextPerekNum}`}>Next Perek</Link>
            </div>
          </div>
          <div className='divider hide-on-med-and-down' />
          <br className='hide-on-med-and-down' />
          <div className='row'>
            <div className='center'>
              <button className='waves-effect waves-light btn tsblue col l2 m3 s12 offset-l2' onClick={() => this.setState({ show: 'heb' })}>Hebrew</button>
              <button className='waves-effect waves-light btn tsblue col l2 m4 s12 offset-l1 offset-m1' onClick={() => this.setState({ show: 'par' })}>Hebrew/English</button>
              <button className='waves-effect waves-light btn tsblue col l2 m3 s12 offset-l1 offset-m1' onClick={() => this.setState({ show: 'eng' })}>English</button>
            </div>
          </div>
          <div className='row'>
            <div className='card'>
              <div className='card-content'>
                <Tanach
                  sefer={sefer}
                  perek={perek}
                  show={this.state.show}
                  part={act.part_name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NachPerek;
