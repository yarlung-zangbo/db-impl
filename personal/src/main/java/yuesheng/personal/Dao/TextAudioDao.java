package yuesheng.personal.Dao;

import yuesheng.personal.Entity.TextAudio;

public interface TextAudioDao  {
    public TextAudio findByBookid(int bookid);
    public int deleteByBookid(int bookid);
}
