import { Component } from '@angular/core';
import { ISubjectRow } from './shared/models/SubjectRow';
import { MatSelectChange } from '@angular/material/select';

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
  coefficient: number = 10

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
    const value = (event.target.value)
    this.subjectCount[index].finalScore = value
  }

  onChangeCreditsCount(event: any, index: number) {
    const value = (event.target.value)
    this.subjectCount[index].creditsCount = value
  }

  onCaculate() {
    let totalFinalScore: number = 0
    let totalCreditsCount: number = 0

    for (let i of this.subjectCount) {
      if (i.finalScore === '' || Number(i.finalScore) > 10 || Number(i.finalScore) < 0) {
        alert('Điểm không hợp lệ')
        return
      }
      if (Number(i.creditsCount) <= 0) {
        alert('Số tín chỉ không hợp lệ')
        return
      }
      if (this.coefficient === 10) {
        totalFinalScore += Number(i.finalScore) * Number(i.creditsCount)
      } else if (this.coefficient === 4) {
        totalFinalScore += this.convertTenToFour(Number(i.finalScore)) * Number(i.creditsCount)
      }
      totalCreditsCount += Number(i.creditsCount)
    }

    if (totalFinalScore / totalCreditsCount) {
      this.semeterPoint = Number((totalFinalScore / totalCreditsCount).toFixed(2))
    } else {
      alert('Thông tin không hợp lệ')
    }
  }

  onDeleteRow(index: number) {
    if (this.subjectCount.length === 1) {
      alert('Không thể xoá')
      return
    }
    this.subjectCount.splice(index, 1)
  }

  onSelectedValue(event: MatSelectChange) {
    this.coefficient = event.value
  }

  convertTenToFour(point: number): number {
    if (point >= 8.5 && point <= 10) {
      return 4
    } else if (point >= 7.8 && point <= 8.4) {
      return 3.5
    } else if (point >= 7 && point <= 7.7) {
      return 3
    } else if (point >= 6.2 && point <= 6.9) {
      return 2.5
    } else if (point >= 5.5 && point <= 6.1) {
      return 2
    } else if (point >= 4.8 && point <= 5.4) {
      return 1.5
    }
    return 0
  }
}
