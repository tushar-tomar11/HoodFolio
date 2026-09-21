import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HfPremiumBadge from '@/components/hf/HfPremiumBadge.vue';

describe('hfPremiumBadge', () => {
  it('shows amber PREMIUM badge for positive premium > 0.1%', () => {
    const wrapper = mount(HfPremiumBadge, { props: { premium: 0.36 } });
    expect(wrapper.text()).toContain('PREMIUM');
    expect(wrapper.classes()).toContain('badge-premium');
  });
  it('shows green DISCOUNT badge for negative premium < -0.1%', () => {
    const wrapper = mount(HfPremiumBadge, { props: { premium: -0.21 } });
    expect(wrapper.text()).toContain('DISCOUNT');
    expect(wrapper.classes()).toContain('badge-discount');
  });
  it('shows AT PAR for premium between -0.1% and 0.1%', () => {
    const wrapper = mount(HfPremiumBadge, { props: { premium: 0.05 } });
    expect(wrapper.text()).toContain('AT PAR');
    expect(wrapper.classes()).toContain('badge-par');
  });
  it('shows the correct percentage value', () => {
    const wrapper = mount(HfPremiumBadge, { props: { premium: 1.48 } });
    expect(wrapper.text()).toContain('1.48');
  });
  it('has accessible title attribute explaining the meaning', () => {
    const wrapper = mount(HfPremiumBadge, { props: { premium: 0.36 } });
    expect(wrapper.attributes('title')).toBeTruthy();
  });
});
