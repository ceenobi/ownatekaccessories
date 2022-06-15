export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // {
    //     name: "image",
    //     title: "Image",
    //     type: "array",
    //     of: [{type: "image"}],
    //     options: {
    //         hotspot: true
    //     }
    // },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [
        {
          type: 'image',
        },
        {
          title: 'Url',
          name: 'urlObject',
          type: 'object',
          fields: [
            {
              title: 'Url',
              name: 'urlField',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'desc',
      title: 'Desc',
      type: 'string',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'header',
      title: 'Header',
      type: 'string',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'text',
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
    },
    {
      name: 'midText',
      title: 'Midtext',
      type: 'text',
    },
    {
      name: 'smallText',
      title: 'Smalltext',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
  ],
}
