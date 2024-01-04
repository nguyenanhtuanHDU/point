import { Component } from '@angular/core';
import { ISubjectRow } from './shared/models/SubjectRow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  subjectCount: ISubjectRow[] = [{
    finalScore: '',
    creditsCount: ''
  }]

  semeterPoint!: number

  onAddSubjectRow() {
    this.subjectCount.push(
      {
        finalScore: '',
        creditsCount: ''
      }
    )
  }

  onReset() {
    this.subjectCount.map(item => {
      item.finalScore = ''
      item.creditsCount = ''
    })
  }

  onChangeFinalScore(event: any, index: number) {
    this.subjectCount[index].finalScore = event.target.value
  }

  onChangeCreditsCount(event: any, index: number) {
    this.subjectCount[index].creditsCount = event.target.value
  }

  onCaculate() {
    let totalFinalScore: number = 0
    let totalCreditsCount: number = 0

    for (let i of this.subjectCount) {
      totalFinalScore += Number(i.finalScore) * Number(i.creditsCount)
      totalCreditsCount += Number(i.creditsCount)
    }
    if(totalFinalScore / totalCreditsCount){
      this.semeterPoint = totalFinalScore / totalCreditsCount
    }else {

    }
  }

  onDeleteRow(index: number){
    this.subjectCount.splice(index, 1)
  }
}
