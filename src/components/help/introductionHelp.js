/* eslint-disable react/function-component-definition, arrow-body-style, max-len, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import Profilepic from './images/Profilepic.png';

const IntroductionHelp = () => {
  return (
    <div>
      <PageHeader
        style={{ fontSize: '32px', marginBottom: '5px', fontWeight: 'normal' }}
      >
        Introduction
      </PageHeader>
      <p style={{ fontSize: '16px' }}>
        This section of RM Tool contains a wealth of information to help HR
        Department, Project Managers and other Stakeholders understand what are
        the facilities provided by the tool. The help information to the tool is
        provided in different formats: how support is provided to the tool users
        and more.
      </p>
      <h1><b>Steps to Upload Profile Picture</b></h1>
      <ol>
        <li>Click the icon to initiate the upload process.</li>
        <img src={Profilepic} alt="Profile Pic Upload Button" height={70} width={100} />
        <li>Select a picture from your device&apos;s files.</li>
        <li>Confirm your selection by clicking the <b> OK</b> button.</li>
        <li>On click of OK a popup will appear with a message: <b>&quot;Profile picture uploaded successfully.&quot;</b></li>
      </ol>
    </div>
  );
};

export default IntroductionHelp;
