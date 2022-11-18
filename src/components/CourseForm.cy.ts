import CourseForm from './CourseForm.vue'

describe('<CourseForm />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(CourseForm)
  })
})