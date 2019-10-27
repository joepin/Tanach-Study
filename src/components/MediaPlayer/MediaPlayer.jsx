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

    const isVideo = selected === 'video';
    const Content = isVideo ? VideoContent : AudioContent;
    const src = isVideo ? vSrc : aSrc;

    return (
      <div className={className}>
        <div className='card'>
          <div className='card-tabs'>
            <ul className='tabs'>
              <li className={`tab psplusgreen-text clickable ${!isVideo && styles['active-tab']}`}>
                <div className={styles['tab-content']} onClick={() => selectType('audio')}>
                  Audio
                </div>
              </li>
              <li className={`tab psplusgreen-text clickable ${isVideo && styles['active-tab']}`}>
                <div className={styles['tab-content']} onClick={() => selectType('video')}>
                  Video
                </div>
              </li>
            </ul>
          </div>
          <div className='card-content'>
            <Content
              nowPlaying={nowPlaying}
              title={title}
              image={teacherImage}
              teacher={teacherString}
              bio={teacherBio}
              src={src}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default MediaPlayer;
