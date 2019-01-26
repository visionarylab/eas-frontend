import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SocialShareButton from './SocialShareButton.jsx';

describe('SocialShareButton', () => {
  it('Facebook should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_cool_url" type="facebook" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Whatsapp should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_url" type="whatsapp" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Telegram should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_url" type="telegram" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Twitter should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_url" type="twitter" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Email should render correctly', () => {
    const wrapper = mount(<SocialShareButton url="the_url" type="email" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should not be rendered if type not valid', () => {
    const wrapper = mount(<SocialShareButton url="the_url" type="not_valid_type" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
