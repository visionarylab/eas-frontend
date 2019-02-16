import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SocialShareButton from './SocialShareButton.jsx';

describe('SocialShareButton', () => {
  it('Facebook should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_cool_url" socialType="facebook" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Whatsapp should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_url" socialType="whatsapp" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Telegram should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_url" socialType="telegram" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Twitter should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_url" socialType="twitter" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Email should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_url" socialType="email" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should not be rendered if socialType not valid', () => {
    const wrapper = mount(<SocialShareButton url="the_url" socialType="not_valid_type" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
