'use strict'

console.clear();

{
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    // 先月末
    const getCalendarHead = () => {
        const dates = [];
        const d = new Date(year, month, 0).getDate(); //日付
        const n = new Date(year, month, 1).getDay(); //曜日(週が始まって何日目か)（０～６）
        for (let i = 0; i < n; i++) {
            dates.unshift({
                date: d - i,
                isToday: false,
                isDisabled: true,
            });
        }
        return dates;
    }
    // 今月
    const getCalendarBody = () => {
        const dates = [];   //date=日付 day=曜日
        const lastDate = new Date(year, month + 1, 0).getDate(); //翌月の0日 = 今月の末日
        for (let i = 1; i <= lastDate; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });
        }
        if (year === today.getFullYear() && month === today.getMonth()) {
            dates[today.getDate() - 1].isToday = true;  
        }
        return dates;
    }
    // 来月頭
    const getCalendarTail = () => {
        const dates = [];
        const lastDay = new Date(year, month + 1, 0).getDay();
        for (let i = 1; i < 7 - lastDay; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            });
        }
        return dates;
    }
    // カレンダーの描画
    const createCalendar = () => {
        const tbody = document.querySelector('tbody');
        // 最初の子要素がある限り、削除してね！
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        // 年、月
        // 必ず２桁で！０で埋めて！
        const title = `${year}/${String(month + 1).padStart(2, '0')}`;
        document.querySelector('#title').textContent = title;
        const dates = [
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarTail(),   
        ];
        const weeks = [];
        const weeksCount = dates.length / 7;
        for (let i = 0; i < weeksCount; i++) {
            weeks.push(dates.splice(0, 7));
        }
        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td');
                td.textContent = date.date;
                if(date.isToday) {
                    td.classList.add('today');
                }
                if(date.isDisabled) {
                    td.classList.add('disabled');
                }
                tr.appendChild(td); 
            })
            document.querySelector('tbody').appendChild(tr);  
        })  
    }
    createCalendar();

    // 1月戻る
    document.querySelector('#prev').addEventListener('click', () => {
        month--;
        if(month <  0) {
            year--;
            month = 11;
        }
        createCalendar();
    })
    // １月進む
    document.querySelector('#next').addEventListener('click', () => {
        month++;
        if(month >  11) {
            year++;
            month = 0;
        }
        createCalendar();
    })
    // todayのclickイベント
    // 今月に戻る
    document.querySelector('#today').addEventListener('click', () => {
        year = today.getFullYear();
        month = today.getMonth();
        createCalendar();
    })

    
}