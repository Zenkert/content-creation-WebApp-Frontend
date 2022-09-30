import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  cards = [
    {
      title: 'University of Siegen',
      description: 'assets/de.jpg',
      buttonText: 'Button',
      img: 'assets/uni-siegen.jpg',
      countryName: 'Germany',
      link: 'https://www.uni-siegen.de/start/index.html.en?lang=en'
    },
    {
      title: 'Institute of Knowledge Based Systems and Knowledge Management',
      description: 'assets/de.jpg',
      buttonText: 'Button',
      img: 'assets/kbs.png',
      countryName: 'Germany',
      link: 'https://www.eti.uni-siegen.de/ws/index.html.en?lang=en'
    },
    {
      title: 'Wirtschaftsinformatik und Neue Medien',
      description: 'assets/de.jpg',
      buttonText: 'Button',
      img: 'assets/winfo_newmedia.png',
      countryName: 'Germany',
      link: 'https://www.wineme.uni-siegen.de/'
    },
    {
      title: 'University of Alicante',
      description: 'assets/es.jpg',
      buttonText: 'Button',
      img: 'assets/universidad_alicante.png',
      countryName: 'Spain',
      link: 'https://www.ua.es/en/'
    },
    {
      title: 'Open Lab Athens | Research and Technology Lab',
      description: 'assets/el.jpg',
      buttonText: 'Button',
      img: 'assets/openlab.png',
      countryName: 'Greece',
      link: 'https://olathens.gr/'
    },

  ];
}
