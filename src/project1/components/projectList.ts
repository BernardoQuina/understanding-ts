import { Component } from '../components/baseComponent'
import { Autobind } from '../decorators/autobind'
import { DragTarget } from '../models/dragDropInterfaces'
import { Project, ProjectStatus } from '../models/project'
import { projectState } from '../state/projectState'
import { ProjectItem } from './projectItem'

// ProjectList Class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[]

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`)

    this.assignedProjects = []

    this.configure()

    this.renderContent()
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault()
      this.element.classList.add('droppable')
      const elementUl = this.element.querySelector('ul')!
      elementUl.classList.add('droppableBackground')
    }
  }

  @Autobind
  dragLeaveHandler(_event: DragEvent) {
    this.element.classList.remove('droppable')
    const elementUl = this.element.querySelector('ul')!
    elementUl.classList.remove('droppableBackground')
  }

  @Autobind
  dropHandler(event: DragEvent) {
    event.preventDefault()
    const prjId = event.dataTransfer!.getData('text/plain')

    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    )

    const elementUl = this.element.querySelector('ul')!
    elementUl.classList.remove('droppableBackground')
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)
    projectState.addListener((projects: Project[]) => {
      const filteredProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active
        } else {
          return prj.status === ProjectStatus.Finished
        }
      })
      this.assignedProjects = filteredProjects
      this.renderProjects()
    })
  }

  renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS'
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement

    listEl.innerHTML = ''

    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem)
    }
  }
}
