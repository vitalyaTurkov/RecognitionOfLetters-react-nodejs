import React from 'react'

import Typography from "@material-ui/core/Typography/Typography"
import Card from "@material-ui/core/Card"

import "./style.css"

class About extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="textContent">
                    <Card>
                        <div className="cardWrap">
                            <img src="http://www.kartinkijane.ru/large/201501/79411.jpg" alt="img-about"/>
                            <Typography>
                                Это обучаемая программа по распознаванию букв. Нарисуйте букву и нажмите отправить.
                                Если программа дала неправильный результат, то введите букву в текстовое поле и нажмите "НАУЧИТЬ".
                                Через какое-то количество попыток программа перестанет ошибаться вовсе. Приятного пользования.
                            </Typography>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default About
