import { React } from 'react';
import './AboutMe.css';
import TitleWithLine from '../TitleWithLine/TitleWithLine';
import myPhoto from '../../images/my-photo.jpg';
import LinkComponent from '../LinkComponent/LinkComponent';

function AboutMe() {

  const linkStyleText = "about-me__text-link";
  const linkStyleGithub = "about-me__link";
  
  const websites = {
    headHunter: <LinkComponent url="https://hh.ru/article/16336/" text="конкурсе видео-резюме" className={linkStyleText}/>,
    youTube: <LinkComponent url="https://www.youtube.com/watch?v=JkIgnqiapYU" text="мой ролик на Youtube" className={linkStyleText}/>,
    ms: <LinkComponent url="https://ms11.ru/" text="Мостострой-11" className={linkStyleText}/>,
    conf: <LinkComponent url="http://ms11.ru/novosti/opredeleny-pobediteli-ezhegodnoy-konferencii-molodyh-specialistov" text="побеждал с докладами на конференциях" className={linkStyleText}/>,
    article: <LinkComponent url="https://docs.google.com/viewerng/viewer?url=https://t-s.today/PDF/10SATS120.pdf&hl=ru" text="статей" className={linkStyleText}/>,
    dbc: <LinkComponent url="https://dbcconsultants.com/" text="DBC Consultants" className={linkStyleText}/>,
    sminex: <LinkComponent url="https://www.sminex.com/" text="Sminex" className={linkStyleText}/>,
    github: <LinkComponent url="https://github.com/ArtemiiKokodeev/" text="Github" className={linkStyleGithub}/>,
  };

  return (
    <section className="about-me" id="about-me">
      <TitleWithLine title={"Студент"}/>
      <div className="about-me__container">
        <div className="about-me__description-container">
          <h3 className="about-me__title">Артемий</h3>
          <p className="about-me__job">Frontend Developer, 28 лет</p>

          <p className="about-me__info">
          Я родился в Саратове, закончил в 2016 г. СГТУ имени Гагарина Ю.А. по специальности
          "Строительство мостов, железных дорог и транспортных тоннелей". На последнем курсе благодаря выигранной стипендии я учился за рубежом, 
          в Словацком технологическом университете в г.Братислава. В тот же год прошел месячный языковой курс в Университете Глостершира 
          в г.Челтнем, UK, заняв первое место в {websites.headHunter} компании HeadHunter ({websites.youTube}). 
          </p>

          <p className="about-me__info">
          После учебы я более 4 лет работал в аппарате управления компании {websites.ms}. Дорос до ведущего инженера по направлению планирования, 
          аналитики и контроля реализации проектов. Проводил внутренние курсы обучения, выступал и {websites.conf}. Получил огромный профессиональный 
          и жизненный опыт, объездил с командировками полстраны от Череповца до Тюмени, от Краснодарского края до Нового Уренгоя. 
          Параллельно за эти годы я успел закончить аспирантуру, опубликовал ряд {websites.article} по вопросам управления проектами в транспортном строительстве.
          </p>
          
          <p className="about-me__info">
          С начала 2021 г. живу и работаю в Москве. Решил диверсифицироваться, и перешел из мостостроения в сферу строительства и реконструкции ТРЦ, в компанию {websites.dbc}, 
          технического заказчика на программе проектов компании IKEA. А с мая 2022 г. и по настоящее время работаю на позиции главного специалиста по планированию и отвечаю за развитие внутренней ERP системы 
          по управлению проектами в компании {websites.sminex}, ведущем столичном девелопере в сегменте элитной и премиум недвижимости.
          </p>

          <p className="about-me__info">
          На текущем месте работы я с головой погрузился в мир ИТ: формирую ТЗ, взаимодействую с разработчиками, аналитиками, тестировщиками, участвую в планировании спринтов и ретро. 
          И в процессе я сильно загорелся идеей овладеть навыками программирования. Вспомнил, как еще в студенчестве любил занимался разработкой сайтов на конструкторах Wix и Tilda, и понял, 
          что хочу сделать кардинальный поворот в карьере - начать развиваться и достичь больших высот в сфере веб-разработки!
          </p>

          <p className="about-me__info">
          В июне 2023 г. я успешно завершил курс "Веб-разработчик" от Яндекс.Практикум, и готовлюсь к прохождению собеседований. 
          Мне очень нравится писать код, решать задачки на Codewars, есть несколько идей pet-проектов, которые планирую реализовать в ближайшее время. 
          Ниже ссылки на мой профиль на Github и портфолио.
          </p>
          {websites.github}
        </div>
        <img className="about-me__photo" src={myPhoto} alt="Мое фото" />
      </div>

    </section>
  )
}

export default AboutMe;