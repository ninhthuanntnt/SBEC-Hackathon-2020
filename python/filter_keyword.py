from underthesea import *
text = '''Tôi muốn mua một cái bàn màu vàng có kiểu cổ điển'''
chunks = chunk(text);
for c in chunks:
    print(c)
