import React from 'react'

import Container from 'components/Container'
import Heading from 'components/Heading'
import { SectionAgendaProps } from 'types/api'

import * as S from './styles'

const SectionAgenda = ({ title, description }: SectionAgendaProps) => (
  <Container id="agenda">
    <Heading reverseColor>{title}</Heading>
    <S.Text dangerouslySetInnerHTML={{ __html: description }} />
  </Container>
)

export default SectionAgenda
