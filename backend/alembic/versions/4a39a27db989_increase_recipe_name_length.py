"""Increase recipe name length

Revision ID: 4a39a27db989
Revises: f262b2fa9ba6
Create Date: 2025-11-04 19:52:05.479403

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4a39a27db989'
down_revision: Union[str, Sequence[str], None] = 'f262b2fa9ba6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.alter_column('recipe', 'name', type_=sa.String(length=255))
def downgrade():
    op.alter_column('recipe', 'name', type_=sa.String(length=30))
