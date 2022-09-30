import { animate, animation, keyframes, query, stagger, state, style, transition, trigger, useAnimation } from "@angular/animations";

// bounce effect animation reuseable function 
export let bounceOutLeftAnimation = animation(
    animate('{{ duration }} {{ easing }}', keyframes([
        style({
            offset: .2,
            opacity: 1,
            transform: 'translateX(20px)'
        }),
        style({
            offset: 1,
            opacity: 0,
            transform: 'translateX(-100%)'
        })
    ])), {
    params: {
        duration: '2s',
        easing: 'ease-out'
    }
}
)

// Side effect animation reuseable function 
export let slideEffect = animation(
    animate('{{ duration }} {{ easing }}', keyframes([
        style({ transform: 'translateX(-10px)' }),
    ])), {
    params: {
        duration: '500ms',
        easing: 'ease-out'
    }
}
)

// Fade in animation
export let fadeInAnimationStagger =  trigger('fadeIn', [
    transition(':enter', [
      query(':enter', [
        style({ opacity: 0 }),
        stagger('150ms', [
          animate('500ms', style({ opacity: 1, transform: "translateX(10px)" }))
        ])
      ])
    ])
  ])

export let fadeInAnimation = animation([
    animate('{{ duration }} {{ easing }}'),
    style({ backgroundColor: '#ccdceb', opacity: 0 })
], {
    params: {
        duration: '2s',
        easing: 'ease-out'
    }
})

//Fade out animation
export let fadeOutAnimation = animation([
    animate('{{ duration }} {{ easing }}'),
    style({ backgroundColor: '#ccdceb', opacity: 0 })
], {
    params: {
        duration: '2s',
        easing: 'ease-out'
    }
})

// Fade animation
export let fade = trigger('fade', [
    transition(':enter', [
        query('fade', [
            stagger(200, useAnimation(fadeInAnimation))

        ])
    ]),
    transition(':leave', [
        useAnimation(fadeOutAnimation)
    ])
])

// Slide effect with bounce on delete
export let slideEffectWithBounce = trigger('slideEffectWithBounce', [
    transition(':enter', [
        useAnimation(slideEffect)
    ]),
    transition(':leave',
        useAnimation(bounceOutLeftAnimation))
])

// Zoom in effect on enter and bounce effect on delete
export let zoomEffect = trigger('zoomEffect', [
    transition(':enter', [
        animate(2000, keyframes([
            style({
                offset: .2,
                opacity: 0,
                transform: 'scale3d(0.3, 0.3, 0.3)'
            }),
            style({
                offset: .5,
                opacity: 1,
            })
        ]))
    ]),
    transition(':leave', [
        animate('0.5s ease-in', keyframes([
            style({
                offset: .2,
                opacity: 1,
                transform: 'translateX(20px)'
            }),
            style({
                offset: 1,
                opacity: 0,
                transform: 'translateX(-100%)'
            })
        ]))
    ])
])

//slidingEntrance animation
export let slidingEntrance = trigger('slidingEntrance', [
    transition(':enter', [
        animate(2000, keyframes([
            style({
                offset: .2,
                transform: 'translate3d(-100%, 0, 0) skewX(30deg)',
                opacity: 0,
            }),
            style({
                offset: .5,
                transform: 'translate3d(0, 0, 0)',
            })
        ]))
    ]),
    transition(':leave', [

    ])
])