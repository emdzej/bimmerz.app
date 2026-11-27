# New firmware

> A new look for the whole unit: the stock modules that do the work stay,
> the screens you use are replaced. Work in progress — nothing to install yet.

The [car functions](./carbus) add screens to BMW's software. This goes
further. What if the MENU, the radio screen, the settings and the pop-ups
were all ours, drawn the same way, and the stock parts — the kernel, the
drivers, the radio and CD plumbing, the I-Bus — just kept doing their job
underneath?

That's the plan. Today it's a working mockup called shellx: it runs as an
app from the Apps menu, in the emulator and on a real unit, with made-up
data where the real data isn't wired yet. The screenshots below come
straight from the emulator, pixel for pixel.

## Home

The menu sits on the left, the selected function on the right, live.

![Home: the menu and the radio beside it](/navx/shell/home.png)

## Turn and press, nothing else

Everything works with the knob alone: turn to move, press to choose.
MENU always takes you home, as on the stock unit. Back is not a button —
it's the first stop on every screen, the ‹ next to the title, so you turn
to it and press.

Why so strict? Because three inputs are easy to get from somewhere else.
The steering-wheel buttons could drive the same screens later, without a
second way of doing things.

## Split or full screen

A function opens beside the menu or on the whole screen, whichever suits
it. The radio can do both: change stations next to the menu, or pick
**Full** for the big layout with station names and radio text.

![The radio beside the menu: turn through the presets, press to tune](/navx/shell/audio-split.png)

![The radio on the full screen](/navx/shell/audio-full.png)

The car screen and the settings open on the full screen.

![The car screen with lock, unlock and the car's menus](/navx/shell/car.png)

## Settings without holding buttons

Press a setting and its choices appear on the right, with Cancel at the
end. Turn to choose, press to take it. Leave it for 15 seconds and nothing
changes.

![Editing a setting: the choices on the right](/navx/shell/settings-edit.png)

## Pop-ups and parking

Door and window notes appear over whatever is on the screen. Reverse
gear brings up the parking distance view.

![A door note over the settings](/navx/shell/door-note.png)

![Parking distance](/navx/shell/pdc.png)

## Day and night

Every screen has a night version, used after dark.

![The radio at night](/navx/shell/audio-night.png)

## The font

The stock fonts are BMW's, and a font scaled down from a computer font
looks mushy at this size — uneven strokes, holes between letters. So the
text is drawn in a bitmap font of our own, pixel by pixel on the unit's
400 × 234 grid, with the Polish letters in it. The first run on a real
unit's monitor looked good.

## What's next

The screens become a small framework, so other apps (the I-Bus monitor is
the first) draw inside the same frame. Then shellx takes over the Apps
menu, and later the stock home screen itself. Navigation guidance and the
map are the hard part and come last.

If you have ideas for a screen, let me know.
