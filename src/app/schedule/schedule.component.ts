// Вначале компонента, после импортов
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ScheduleItem {
  id: number;
  date: string;
  startTime: Date;
  endTime: Date;
  weekDay: string;
  subjectName: string;
  semester: number;
  studentIds: number[] | null;
  teacherName: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  schedules: {[key: string]: ScheduleItem[]} = {}; // Используйте интерфейс для типизации

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeScheduleStructure();
    this.getSchedules(2); // Предполагается, что ID студента - 2
  }

  getSchedules(studentId: number) {
    this.http.get<ScheduleItem[]>(`http://localhost:9090/schedule/get/${studentId}`).subscribe((data: ScheduleItem[]) => {
      this.processSchedules(data);
    });
  }

  processSchedules(data: ScheduleItem[]) {
    data.forEach(item => {
      const weekDayName = this.getWeekDayName(item.weekDay);
      if (this.schedules[weekDayName]) {
        const scheduleItem = {
          ...item,
          startTime: this.createDateFromTime(item.startTime as unknown as string),
            endTime: this.createDateFromTime(item.endTime as unknown as string)
        };

        this.schedules[weekDayName].push(scheduleItem);
      }
    });

    this.weekDays.forEach(day => {
      if (this.schedules[day]) {
        this.schedules[day].sort((a: ScheduleItem, b: ScheduleItem) => {
          return a.startTime.getTime() - b.startTime.getTime();
        });
      }
    });
  }

  createDateFromTime(time: string): Date {
    if (typeof time === 'string') {
      const timeParts = time.split(':');
      const date = new Date();
      date.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0);
      return date;
    } else {
      // Если время уже является объектом Date, просто верните его
      return time;
    }
  }

  getWeekDayName(weekDay: string): string {
    const mapping: { [key: string]: string } = {
      MONDAY: 'Понедельник',
      TUESDAY: 'Вторник',
      WEDNESDAY: 'Среда',
      THURSDAY: 'Четверг',
      FRIDAY: 'Пятница',
      SATURDAY: 'Суббота',
      SUNDAY: 'Воскресенье'
    };
    return mapping[weekDay] || weekDay;
  }

  initializeScheduleStructure() {
    this.weekDays.forEach(day => {
      this.schedules[day] = [];
    });
  }
}
