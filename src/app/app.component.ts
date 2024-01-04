import { Component } from '@angular/core';
import { ISubjectRow } from './shared/models/SubjectRow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  subjectCount: ISubjectRow[] = [{
    finalScore: 0,
    creditsCount: 0
  }]

  onAddSubjectRow() {
    this.subjectCount.push(
      {
        finalScore: 0,
        creditsCount: 0
      }
    )
  }

  onChangeFinalScore(event: any, index: number) {
    this.subjectCount[index].finalScore = event.target.value
  }

  onChangeCreditsCount(event: any, index: number) {
    this.subjectCount[index].creditsCount = event.target.value
  }

  onCaculate() {
    console.log(this.subjectCount);
    let totalFinalScore: number = 0
    let totalCreditsCount: number = 0

    for (let i of this.subjectCount) {
      totalFinalScore += Number(i.finalScore) * Number(i.creditsCount)
      totalCreditsCount += Number(i.creditsCount)
    }
    console.log(totalFinalScore / totalCreditsCount)
  }
}
