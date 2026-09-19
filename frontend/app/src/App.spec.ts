import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import App from '@/App.vue';
import ChainTicker from '@/components/layout/ChainTicker.vue';
import HoodNavbar from '@/components/layout/HoodNavbar.vue';

describe('app', () => {
  it('should render the HoodFolio shell', () => {
    const wrapper = mount(App, { shallow: true });

    expect(wrapper.findComponent(ChainTicker).exists()).toBe(true);
    expect(wrapper.findComponent(HoodNavbar).exists()).toBe(true);
  });
});
