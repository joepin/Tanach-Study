import React, { Component } from 'react';
import styles from './Signup.module.css';

import { ProgramContext } from '../../app-context.js';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      list1: false, // parasha
      list2: false, // nach
      list3: false, // mishna
      list4: false, // parasha+
      list5: true, // events
      all: false,
    };
    this.setAllLists = this.setAllLists.bind(this);
    this.setOneList = this.setOneList.bind(this);
  }

  setAllLists(e) {
    const { all } = this.state;
    if (!all) {
      this.setState({
        list1: true,
        list2: true,
        list3: true,
        list4: true,
        list5: true,
        all: true,
      });
    }
  }

  setOneList(e, key) {
    const { all, [key]: thisKey } = this.state;
    if (all) {
      this.setState({
        all: false,
        [key]: !thisKey,
      });
    } else {
      let thisKeyVal = false;
      let otherKeyVals = true;
      for (let i = 1; i < 6 && otherKeyVals; i++) {
        const { [`list${i}`]: iterKeyVal } = this.state;
        if (key === `list${i}`) {
          thisKeyVal = thisKey;
        } else if (!iterKeyVal) {
          otherKeyVals = false;
        } else {
          otherKeyVals = true;
        }
      }
      if (!thisKeyVal && otherKeyVals) {
        this.setState({
          list1: true,
          list2: true,
          list3: true,
          list4: true,
          list5: true,
          all: true,
        });
      } else {
        this.setState({
          [key]: !thisKey,
        });
      }
    }
  }

  doSubmit(e) {
    // stop default form action
    e.preventDefault();
    const { fetching } = this.props;
    // tell parent that we're fetching
    fetching(true);
    // get the data from state
    const { email, firstName, lastName } = this.state;
    const { list1, list2, list3, list4, list5 } = this.state;
    if (!(list1 || list2 || list3 || list4, list5)) {
      // TODO: tell the user
      return;
    }
    const lists = [list1, list2, list3, list4, list5];
    // TODO: validate data
    // make the call
    fetch('https://api.tanachstudy.com/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        emailLists: JSON.stringify(lists),
      }),
    })
      .then(r => r.json())
      .then((resp) => {
        const { response } = this.props;
        if (resp.status === 'OK') {
          const obj = {
            email: resp.email,
            fname: resp.first_name,
            lname: resp.last_name,
            lists: resp.email_lists,
          };
          response(false, obj);
        } else {
          response(true, resp);
        }
      })
      .catch((err) => {
        const { response } = this.props;
        response(true, err.message);
      });
  }

  render() {
    const { firstName, lastName, email } = this.state;
    const { all, list1, list2, list3, list4, list5 } = this.state;
    return (
      <form className='tsblue-form'>
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          required
          value={firstName}
          onChange={e => this.setState({ firstName: e.target.value })}
        />
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          required
          value={lastName}
          onChange={e => this.setState({ lastName: e.target.value })}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          required
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <div className='row'>
          <p className='center-align'>Please select which lists you&apos;d like to subscribe to:</p>
          <i>If you wish to be notified of events & lectures, please also select the events&nbsp;
          list; this is managed separately from our daily emails.
          </i>
        </div>
        <div className='row'>
          <div className='col l12 m12 s12 left-align'>
            <label htmlFor='allLists' className={styles['checkbox-label']}>
              <input
                type='checkbox'
                id='allLists'
                className={styles['ts-checkbox']}
                checked={all}
                onChange={this.setAllLists}
              />
              <b>All:</b> Sign up to all of our email lists!
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col l12 m12 s12 left-align'>
            <label htmlFor='list1' className={styles['checkbox-label']}>
              <input
                type='checkbox'
                id='list1'
                className={styles['ts-checkbox']}
                checked={list1}
                onChange={e => this.setOneList(e, 'list1')}
              />
              <b>Parashat Hashavua:</b> Daily email with classes of each week&apos;s parasha
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col l12 m12 s12 left-align'>
            <label htmlFor='list2' className={styles['checkbox-label']}>
              <input
                type='checkbox'
                id='list2'
                className={styles['ts-checkbox']}
                checked={list2}
                onChange={e => this.setOneList(e, 'list2')}
              />
              <b>Nevi&apos;im & Ketuvim:</b> Daily email methodically studying a perek a day of Nach
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col l12 m12 s12 left-align'>
            <label htmlFor='list3' className={styles['checkbox-label']}>
              <input
                type='checkbox'
                id='list3'
                className={styles['ts-checkbox']}
                checked={list3}
                onChange={e => this.setOneList(e, 'list3')}
              />
              <b>MishnaStudy:</b> Daily email studying Mishna with Perush HaRambam
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col l12 m12 s12 left-align'>
            <label htmlFor='list4' className={styles['checkbox-label']}>
              <input
                type='checkbox'
                id='list4'
                className={styles['ts-checkbox']}
                checked={list4}
                onChange={e => this.setOneList(e, 'list4')}
              />
              <b>ParashaStudy Plus:</b> Daily email studying different mefarshim on the parasha
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col l12 m12 s12 left-align'>
            <label htmlFor='list5' className={styles['checkbox-label']}>
              <input
                type='checkbox'
                id='list5'
                className={styles['ts-checkbox']}
                checked={list5}
                onChange={e => this.setOneList(e, 'list5')}
              />
              <b>Events:</b> Periodic email regarding upcoming events and lectures
            </label>
          </div>
        </div>
        <ProgramContext.Consumer>
          {theme => (
            <button
              type='submit'
              className={`btn ${theme.backgroundClass}`}
              onClick={e => this.doSubmit(e)}
            >
              Sign Up!
            </button>
          )}
        </ProgramContext.Consumer>
      </form>
    );
  }
}

export default SignupForm;
