export const works = [
    {
        slug: "ventilation",
        title: "Вентиляция",
        images: Object.values(import.meta.glob('./ventilation/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url', }))
    },
    {
        slug: "installation-in-one-stage",
        title: "Установка в один этап",
        images: Object.values(import.meta.glob('./installation-in-one-stage/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url', }))
    },
    /* 	{
          slug: "big-sas",
          title: "Установка в один 2",
          slider: installationInOneStageImages
      }, */
];

export const getWork = (slug: string) => {
    return works.find(s => s.slug === slug)
}

