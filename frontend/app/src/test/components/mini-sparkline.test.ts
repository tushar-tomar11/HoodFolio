import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MiniSparkline from '@/components/overview/MiniSparkline.vue';

describe('miniSparkline', () => {
  it('renders nothing when data is empty', () => {
    const wrapper = mount(MiniSparkline, { props: { data: [] } });
    expect(wrapper.find('svg').exists()).toBe(false);
  });

  it('renders bars when data is provided', () => {
    const wrapper = mount(MiniSparkline, { props: { data: [1, 2, 3, 4] } });
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.findAll('rect').length).toBe(4);
  });
});
