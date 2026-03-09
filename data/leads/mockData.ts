export const leadsColumns = [
  {
    id: 'needs-review',
    title: 'Lead needs to be reviewed',
    count: 3,
    color: 'bg-yellow-100',
    cards: [
      {
        id: '1',
        name: 'Koen Driessens',
        title: 'Chief Executive Officer',
        company: 'TM Induction Heating',
        chatterDate: 'N/A',
        internalDate: 'N/A',
        sentiment: 'POS maybe interested',
        avatars: ['/leads/avatar-1.png', '/leads/avatar-2.png']
      }
    ]
  },
  {
    id: 'follow-up-myself',
    title: 'Will follow up myself',
    count: 1,
    color: 'bg-blue-100',
    cards: [
      {
        id: '4',
        name: 'Arnoud van Lent',
        title: 'Enterprise Account Manager',
        company: 'Cohelity',
        chatterDate: '01-01-26',
        internalDate: '04-01-26',
        sentiment: 'Interested in follow-up',
        avatars: ['/leads/avatar-3.png']
      }
    ]
  },
  {
    id: 'leadblocks-follow-up',
    title: 'LeadBlocks can follow up',
    count: 0,
    color: 'bg-neutral-100',
    cards: [
      {
        id: '5',
        name: 'Emma Belean',
        title: 'Business Development Manager',
        company: 'b futurist',
        chatterDate: '01-01-26',
        internalDate: '04-01-26',
        sentiment: 'Neutral',
        avatars: ['/leads/avatar-1.png', '/leads/avatar-2.png']
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    count: 1,
    color: 'bg-purple-100',
    cards: []
  },
  {
    id: 'meeting-planned',
    title: 'Meeting planned',
    count: 1,
    color: 'bg-green-100',
    cards: []
  },
  {
    id: 'archived',
    title: 'Archived',
    count: 7,
    color: 'bg-neutral-100',
    cards: []
  }
];