import React, { useState } from 'react';

import AudioPlayer from './AudioPlayer/AudioPlayer.jsx';
import AudioContent from './AudioPlayer/AudioContent.jsx';
import VideoPlayer from './VideoPlayer/VideoPlayer.jsx';
import VideoContent from './VideoPlayer/VideoContent.jsx';

import styles from './MediaPlayer.module.css';

function MediaPlayer(props) {
  const { className, type } = props;

  if (type === 'audio') {
    return <AudioPlayer {...props} />;
  }

  if (type === 'video') {
    return <VideoPlayer {...props} />;
  }

  if (type === 'combo') {
    const [selected, selectType] = useState('audio');

    const { videoURL, audioURL, name, title, part } = props;
    const { teacherTitle,
      teacherFirst,
      teacherMiddle,
      teacherLast,
      teacherImage,
      teacherBio } = props;
    const middle = teacherMiddle || '';
    const teacherString = `${teacherTitle} ${teacherFirst} ${middle} ${teacherLast}`;
    const nowPlaying = `${name} ${part}`;

    const { aHost, aPath } = audioURL || {};
    const aSrc = `${aHost}${aPath}`;
    const { vHost, vPath } = videoURL || {};
    const vSrc = `${vHost}${vPath}`;

    return (
      <div className={className}>
        <div className='card'>
          <div className='card-content'>
            {selected === 'video' ? (
              <VideoContent
                nowPlaying={nowPlaying}
                title={title}
                image={teacherImage}
                teacher={teacherString}
                bio={teacherBio}
                src={vSrc}
              />
            ) : (
              <AudioContent
                nowPlaying={nowPlaying}
                title={title}
                image={teacherImage}
                teacher={teacherString}
                bio={teacherBio}
                src={aSrc}
              />
            )}
          </div>
          <div className='card-tabs'>
            <ul className='tabs'>
              <li className={`tab psplusgreen-text
                ${selected === 'audio' ? styles['active-tab'] : ''}`}
              >
                <span onClick={() => selectType('audio')}>Audio</span>
              </li>
              <li className={`tab psplusgreen-text
                ${selected === 'video' ? styles['active-tab'] : ''}`}
              >
                <span onClick={() => selectType('video')}>Video</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default MediaPlayer;
